/*
gcc -Wall main_muon.c data_file.c lineq.c lsq.c matrix_ops.c gauss_newton.c -lm -o main_muon
./main_muon sift.dat >| hist.dat

set terminal png size 2048,1536 font "latin modern math,36.0" enhanced
set output 'muon.png'
set colorsequence classic
set boxwidth 0.9 relative
set title 'Muon Mean Lifetime'
set xlabel 'time (ns)'
set ylabel 'counts/bin'
set samples 500
scale = 1000
c1 = .7
a1 = 117
tau1 = 2013
f_iter(x) = c1 + a1*exp(-x/tau1)
c2 = .867
a2 = 86.85
tau2 = 3144
f_w(x) = c2 + a2*exp(-x/tau2)
c3 = .867
a3 = 30.5
tau3 = 4576
f_l(x) = c3 + a3*exp(-x/tau3)
plot 'hist.dat' u 1:2with boxes title '' lc rgb "grey", f_iter(x) lw 2 lt rgb "blue" title '.7 + 117*exp(-x/2013)', f_w(x) lw 2 lt rgb "red" title '.867 + 86.9*exp(-x/3144)', f_l(x) lw 2 lt rgb "green" title '.867 + 30.5*exp(-x/4576)'
unset output
unset terminal


*/


#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include "data_file.h"
#include "lineq.h"
#include "lsq.h"
#include "matrix_ops.h"
#include "gauss_newton.h"

struct point2d *data;
int size = 1000;
int badbins = 7;

void func(int n,double *x_values,double *y_values, double *init_guess, double *s) {
    for(int i = 0; i < n; i++){
        s[i] = init_guess[0]+init_guess[1]*exp(-x_values[i+badbins]/init_guess[2])-(y_values[i+badbins]);
    }
    return;
}

void jacobian(int n,int m, double **a, double *x_values, double *y_values, double *init_guess) {
    for(int i = 0; i < n; i++){
        a[i][0] = 1.0;
        a[i][1] = exp(-x_values[i+badbins]/init_guess[2]);
        a[i][2] = (init_guess[1]*x_values[i+badbins]*exp(-x_values[i+badbins]/init_guess[2]))/(init_guess[2]*init_guess[2]);
    }
    return;
}

int bin_data_muon(int size, double bin_width,int n_points, double *bin_center,double *bin_freq) {
    
    double center = bin_width/2.0;
    double center2 = bin_width/2.0;
    for(int i = 0; i < size; i++){
        
        bin_center[i] = center;
        
        bin_freq[i] = 0.0;
        for(int j = 0; j < n_points; j++){
            if(data[j].x > 39999.0){continue;}
            if(data[j].x > bin_center[i]-center2  &&  data[j].x <= bin_center[i]+center2){
                bin_freq[i] = bin_freq[i] + 1.0;
            }
        }
        center = center + (double)bin_width;
    }
    return(0);
}

int main(int argc, const char * argv[]) {
    int n_points,last, bin_width;
    double c, a, tau, x_values[size],y_values[size], *init_guess;
    bin_width = 20;
    last = 15;
    
    if (argc != 2) {
        fprintf(stderr,"%s <input file>\n",argv[0]);
        exit(1);
    }
    
    n_points = read_data_file(argv[1], &data);
    fprintf(stderr,"Read %d points from data file %s\n",n_points,argv[1]);
    
    bin_data_muon(size, bin_width, n_points, x_values, y_values);
    for (int i = 0; i < size; i++) {
        printf("%f %f\n", x_values[i], y_values[i]);
    }
    
    fprintf(stderr,"lsq\n");
    lsq_data(size, badbins, x_values, y_values);
    fprintf(stderr,"wlsq\n");
    wlsq_data(size, badbins, x_values, y_values, &a, &tau);
    fprintf(stderr,"Est. Background");
    calculate_background(size, last, y_values, &c);

    int n = size-badbins;
    int m = 3;
    int n_iters = 10;
    double tol[3] = {1.0e-10,1.0e-10,1.0e-10};
    init_guess = malloc(m * sizeof(double));
    init_guess[0] = c;
    init_guess[1] = a;
    init_guess[2] = tau;
    fprintf(stderr,"Gauss-Newton\n");
    gauss_newton(n, m, func, jacobian, x_values, y_values, init_guess, tol, n_iters);
    return 0;
}

