function [out] = lsqexp(x,y)
%least squares unweighted exponential fit
n=length(x);
x(x==0)=1;
y(y==0)=1;
sxlny = sum(x.*log(y));
slny = sum(log(y));
sx2 = sum((x).^2);
sx = sum(x);

out(1) = get_background(y,10);
out(2)= exp((slny.*sx2 - sx.*sxlny)./(n.*sx2 - sx.^2));
out(3) = -1/((n.*sxlny - sx.*slny)./(n.*sx2 - sx.^2));
end

