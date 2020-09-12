#include <stdio.h>
#include <stdlib.h>
#include <math.h>

void lsq_data(int size, int badbins, double *bin_center,double *bin_freq) {
    
    double x, y, sxlny, slny, sx2, sx, a, tau;
    sxlny = 0.0;
    slny = 0.0;
    sx2 = 0.0;
    sx = 0.0;
    for(int i = badbins; i < size; i++){
        x = bin_center[i];
        y = bin_freq[i];
        if((int)bin_freq[i]==0){y = 1.0;}
        sxlny += x*log(y);
        slny += log(y);
        sx2 += x*x;
        sx += x;
    }
    a = exp((slny*sx2 - sx*sxlny)/(size*sx2 - sx*sx));
    tau = -1.0/((size*sxlny - sx*slny)/(size*sx2 - sx*sx));
    fprintf(stderr,"%f  %f\n", a, tau);
}

void wlsq_data(int size, int badbins, double *bin_center,double *bin_freq, double *a, double *tau) {
    
    double x, y, sxlny, sx2y, sxy, slny, sx2, sx, sy, sylny, sxylny, denom;
    sxlny = 0.0;
    sx2y = 0.0;
    sxy = 0.0;
    slny = 0.0;
    sx2 = 0.0;
    sx = 0.0;
    sy = 0.0;
    sylny = 0.0;
    sxylny = 0.0;
    for(int i = badbins; i < size; i++){
        x = bin_center[i];
        y = bin_freq[i];
        if((int)bin_freq[i]==0){y = 1.0;}
        sxlny += x*log(y);
        sx2y += x*x*y;
        sxy += x*y;
        slny += log(y);
        sx2 += x*x;
        sx += x;
        sy += y;
        sylny += y*log(y);
        sxylny += x*y*log(y);
    }
    denom = sy*sx2y - sxy*sxy;
    *a = exp((sx2y*sylny - sxy*sxylny)/denom);
    *tau = -1.0/((-sxy*sylny + sy*sxylny)/denom);
    fprintf(stderr, "%f  %f\n", *a, *tau);
}

void calculate_background(int size, int last,double *bin_freq, double *c) {
    double count = 0.0;
    for(int i = size-1; i >= size-(last+1); i--){
        count += bin_freq[i];
    }
    *c = count/(double) last;
    fprintf(stderr, "%f\n", *c);
}
