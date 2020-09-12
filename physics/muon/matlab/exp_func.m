function y = exp_func(b,xdata)
    y = b(1)+b(2).*exp(-xdata./b(3));
end

