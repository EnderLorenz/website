/* gcc -Wall main_nmr.c data_file.c lineq.c lsq.c matrix_ops.c gauss_newton.c -lm -o main_nmri

set terminal png size 2048,1536 font "latin modern math,36.0" enhanced
set output 'nmri.png'
set title 'NMR Spectroscopy Relaxation Time'
set xlabel 'time delay (ms)'
set ylabel 'voltage'
set yrange[-5:5]
c = .05
a = 4.09
tau = 31.59272
f_iter(x) = c + a*(1.0-2.0*exp(-x/tau))
plot 'nmri.dat' title '' lc rgb "blue" pt 7 ps 2, f_iter(x) lw 3 lt rgb "red" title '.05 + 4.09(1-2Exp[-x/31.6])'
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

void func(int n,double *x_values,double *y_values, double *init_guess, double *s) {
    for(int i = 0; i < n; i++){
        s[i] = init_guess[0]+init_guess[1]*(1.0-2.0*exp(-x_values[i]/init_guess[2]))-(y_values[i]);
    }
    return;
}

void jacobian(int n,int m, double **a, double *x_values, double *y_values, double *init_guess) {
    for(int i = 0; i < n; i++){
        a[i][0] = 1.0;
        a[i][1] = 1.0-2.0*exp(-x_values[i]/init_guess[2]);
        a[i][2] = (-init_guess[1]*x_values[i]*2.0*exp(-x_values[i]/init_guess[2]))/(init_guess[2]*init_guess[2]);
    }
    return;
}

int main(int argc, const char * argv[]) {
    int n_points;
    double *x_values,*y_values,*init_guess;
    
    if (argc != 2) {
        fprintf(stderr,"%s <input file>\n",argv[0]);
        exit(1);
    }
    
    n_points = read_data_file(argv[1],&data);
    fprintf(stderr,"Read %d points from data file %s\n",n_points,argv[1]);
    x_values = malloc(n_points * sizeof(double));
    y_values = malloc(n_points * sizeof(double));
    for (int i = 0; i < n_points; i++) {
        x_values[i] = data[i].x;
        y_values[i] = data[i].y;
    }
    
    //int n = n_points;
    int m = 3;
    int n_iters = 100;
    double tol[3] = {1.0e-10,1.0e-10,1.0e-10};
    init_guess = malloc(m * sizeof(double));
    init_guess[0] = 1.0;
    init_guess[1] = 1.0;
    init_guess[2] = 1.0;
    fprintf(stderr,"Gauss-Newton\n");
    gauss_newton(n_points, m, func, jacobian, x_values, y_values, init_guess,tol,n_iters);
    return 0;
}
