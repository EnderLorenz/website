/*

This program takes the data from sift.dat, num_sets, set_size and previosly calculated tau.

We break the data into a num_sets of set_size.  
We create an array (count of size num_sets) of how many decay times < tau are in each set.
We bin the data (count) with bin width 1, possible decay counts are 0 (none decayed < tau) to set_size (they all decayed < tau).  The binning algo exploits this previous knowledge of the possible counts. 
Next the program calculates and prints the mean and variance to stderr.
 
gcc -Wall main_muon13.c data_file.c -lm -o main_muon13
./main_muon13 sift.dat 40 50 2013 >| 13data.dat


set boxwidth 0.9 relative
set style fill solid 1.0
plot '13data.dat' with boxes


set terminal png size 2048,1536 font "latin modern math,36.0" enhanced
set output 'part13.png'
set colorsequence classic
set boxwidth 0.9 relative
set style fill solid 1.0
set title 'Binomial Distribution of Muon Data'
set xlabel 'decays < τ out of 50'
set ylabel 'normalized frequency'
set samples 400
m = 29.385
s = 3.385867
f(x) = 1/(sqrt(2*pi*s**2)) * exp(-(x-m)**2/(2*s**2))
plot '13data.dat' u 1:($2/200) with boxes title '' lc rgb "#FFD700", f(x) lw 3 lt rgb "blue" title 'normal(µ = 29.385, σ = 3.386)'
unset output

*/

#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include "data_file.h"

struct point2d *data;

double get_mean(int n_row, int data_set[]) {
    double mean;
    mean = 0.0;
    for (int i = 0; i < n_row; i++) {
        mean += (double)data_set[i];
    }
    return mean/(double)n_row;
}

double get_variance(int n_row, double mean, int data_set[]) {
    double std;
    std = 0;
    for (int i = 0; i < n_row; i++) {
        std += ( (double)data_set[i]-mean) * ( (double)data_set[i]-mean);
    }
    return std / ((double)n_row-1.0);
}

//this binning algo is for int data, 0->x, with bin size = 1
void bin_int_data(int n_points, int data_set[], int bin_freq[]) {
    for(int j = 0; j < n_points; j++){
        bin_freq[data_set[j]]++;
    }
}

int main(int argc, const char * argv[]) {
    int n_points, set_size, num_sets, counter, *count, *bin_freq;
    double tau, mean, variance;	

    if (argc != 5) {
        fprintf(stderr,"%s <input file> <num_sets> <set_size> <tau>\n",argv[0]);
        exit(1);
    }

    num_sets = atoi(argv[2]);
    set_size = atoi(argv[3]);
    tau = atof(argv[4]);
    count = malloc(num_sets * sizeof(int *));
    bin_freq = malloc((set_size+1) * sizeof(int *));

    n_points = read_data_file(argv[1], &data);
    fprintf(stderr,"Read %d points from data file %s\n",n_points,argv[1]);

    for (int i = 0; i < num_sets; i++) {
	counter = 0;
    	for (int j = 0; j < set_size; j++) {
            if(data[i + num_sets*j].x < tau) counter++;
    	}
    	count[i] = counter;
    }

    bin_int_data(num_sets, count, bin_freq);

    for (int i = 0; i <= set_size; i++) {
        printf("%d %d\n", i, bin_freq[i]);
    }
    mean = get_mean(num_sets, count);
    fprintf(stderr,"Mean = %f\n", mean);
    variance = get_variance(num_sets, mean, count);
    fprintf(stderr,"Variance = %f\n", variance);
    fprintf(stderr,"Std = %f\n", sqrt(variance));

    return 0;
}