clear B
clear A
A = importdata('unsifted.dat');
B = A(A(:,1)<39999);
data = B;
length(data);

PI = 3.14159265358979323846264338327950288;
initelement = 1;
n_sets = 40;
setsize = 50;
bins2 = 9;

groupall = zeros(n_sets,setsize);
decaycount = zeros(n_sets,1);

for i=1:n_sets
    count = 0;
    for j=1:setsize
        groupall(i,j) = data(j+initelement+i.*setsize);
        if groupall(i,j) < 2200
            count  = count + 1;
        end
    decaycount(i) = count;
    end
end

mu = mean(decaycount)
std1 = std(decaycount)
[n13 edges13 binsc13] = histcounts(groupall,setsize);


str131 = ['Decays Less Than, tau=',beta(3), 'out of ',setsize];
str132 = ['mu = ',num2str(mu),' std = ',num2str(std1)];


clear title
figure()
h = histogram(decaycount,setsize)
h.FaceColor = [0.5 0.5 0.5];
h.EdgeColor = [0.7 0.7 0.7];
hold on
title('Binomial Distribution of Muon Decay Data')
xlabel(str131)
ylabel('counts/bin')
legend('data')
hold off


x = linspace(mu-4*std1,mu+4*std1,200);
pdfx = 1/sqrt(2.*pi)./std1.*exp(-(x-mu).^2/(2.*std1.^2));

pd = fitdist(decaycount,'Normal')

figure()
y = pdfx;
plot(x,y,'LineWidth',3)
hold on
histogram(decaycount,setsize,'Normalization','probability')
title('Binomial Distribution of Muon Decay Data')
xlabel(str131)
ylabel('Probability')
legend(str132,'data')
hold off

