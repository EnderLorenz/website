A = importdata('unsifted.dat');
data = (A(A(:,1)<39999));
n_points = length(data);
%% 
bincount = 1000;
binwidth = 20;
bindata = bin_data(bincount, binwidth, n_points, data);
%[n edgesc binsc] = histcounts(data,bincount);

%% delete erroneous bins and fit

x = bindata(7:length(bindata),1);
y = bindata(7:length(bindata),2);

lsq = lsqexp(x,y)
wlsq = wlsqexp(x,y)

opts = statset('nlinfit');
opts.RobustWgtFun = 'bisquare';
beta0 = [wlsq];
[beta,R,J,CovB] = nlinfit(x,y,@exp_func,beta0,opts);
beta
sqrt(diag(CovB))'



str1 = ['Iterated: ',num2str(beta(1)),'+',num2str(beta(2)),'exp(-t/',num2str(beta(3)),')'];
str2 = ['Weighted: ',num2str(wlsq(1)),'+',num2str(wlsq(2)),'exp(-t/',num2str(wlsq(3)),')'];
str3 = ['Unweighted: ',num2str(lsq(1)),'+',num2str(lsq(2)),'exp(-t/',num2str(lsq(3)),')'];

figure()
set(groot,'defaultAxesTickLabelInterpreter','latex'); 
h = histogram(data,bincount);
h.FaceColor = [0.5 0.5 0.5];
h.EdgeColor = [0.7 0.7 0.7];
hold on
plot(x,exp_func(beta,x),'bl')
plot(x,exp_func(wlsq,x),'r')
plot(x,exp_func(lsq,x),'g')
title('Muon Decay Data Binned and Fit','Interpreter','latex','FontSize',16)
xlabel('Decay Time (ns)','Interpreter','latex','FontSize',14)
ylabel('counts/bin','Interpreter','latex','FontSize',14)
legend('data',str1,str2,str3,'Interpreter','latex','FontSize',14)
hold off

figure()
set(groot,'defaultAxesTickLabelInterpreter','latex'); 
Y1 = y-(exp_func(beta,x));
Y2 = y-exp_func(wlsq,x);
Y3 = y-exp_func(lsq,x);
stem(x,Y3,'bl')
hold on
stem(x,Y2,'r')
stem(x,Y1,'g')
title('Fit Residuals','Interpreter','latex','FontSize',16)
xlabel('fitted value','Interpreter','latex','FontSize',14)
ylabel('Residuals','Interpreter','latex','FontSize',14)
legend('data-unweighted','data-weighted','data-iterated',...
    'Interpreter','latex','FontSize',14)
hold off
