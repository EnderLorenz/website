function [soln] = wlsqexp(x,y)
%least squares weighted exponential fit
n=length(x);
x(x==0)=1;
y(y==0)=1;
sxlny = sum(x.*log(y));
sx2y = sum(x.^2.*y);
sxy = dot(x,y);
slny = sum(log(y));
sx2 = sum((x).^2);
sx = sum(x);
sy = sum(y);
sylny = sum(y.*log(y));
sxylny = sum(x.*y.*log(y));

soln(1) = get_background(y,10);
soln(2) = exp((sx2y.*sylny - sxy.*sxylny)./(sy.*sx2y - sxy.^2));
soln(3) = -1/((-sxy.*sylny + sy.*sxylny)./(sy.*sx2y - sxy.^2));

end
