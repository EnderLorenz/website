function c = get_background(y,final_bins)
    c = sum(y(length(y)-final_bins:length(y)))/final_bins;
end
