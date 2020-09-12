#include <stdio.h>
#include <stdlib.h>
#include <math.h>

void matrix_transpose(int n,int m, double **b, double **a) {
    for(int i=0; i < m;i++){
        for(int j = 0; j < n; j++){
            b[i][j] = a[j][i];
        }
    }
    return;
}

void matrix_dotproduct(int n, int m, double **a, double **b, double **c) {
    for(int i=0; i < m;i++){
        for(int j = 0; j < m; j++){
            c[i][j] = 0.0;
            for(int k = 0; k < n; k++){
                c[i][j] += a[i][k]*b[k][j];
            }
        }
    }
    return;
}

void matrix_vectordotproduct(int n,int m, double **b, double *d, double *rhs) {
    for(int i=0; i<m;i++){
        rhs[i] = 0.0;
        for(int j = 0; j < n; j++){
            rhs[i] += b[i][j]*d[j];
        }
    }
    return;
}

int get_inverse3(int m, double  **cov){
    double determinant = 0.0;

    for(int i = 0; i < 3; i++)
        determinant = determinant + (cov[0][i] * (cov[1][(i+1)%3] * cov[2][(i+2)%3] - cov[1][(i+2)%3] * cov[2][(i+1)%3]));
    
    fprintf(stderr,"\nCovariance matrix is: \n");
    for(int i = 0; i < 3; i++){
        for(int j = 0; j < 3; j++)
            fprintf(stderr,"%f\t",((cov[(j+1)%3][(i+1)%3] * cov[(j+2)%3][(i+2)%3]) - (cov[(j+1)%3][(i+2)%3] * cov[(j+2)%3][(i+1)%3]))/ determinant);
        fprintf(stderr,"\n");
    }
    return 0;
}
