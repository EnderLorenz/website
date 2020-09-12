function x = bin_data(size, bin_width, n_points, data)
    center  = bin_width/2.0;
    center2 = center;
    bin_center = zeros(size,1);
    bin_freq = zeros(size,1);
    
    for i = 1:size
        bin_center(i) = center;
        bin_freq(i) = 0.0;
        for j = 1:n_points
            if(data(j) > bin_center(i)-center2  &&  data(j) <= bin_center(i)+center2)
                bin_freq(i) = bin_freq(i) + 1.0;
            end
        end
        center = center + bin_width;
    end
x = [bin_center, bin_freq];
end

