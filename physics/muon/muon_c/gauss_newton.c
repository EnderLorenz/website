#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include "lineq.h"
#include "matrix_ops.h"

//b(s+1)=b(s)-(jt.j)^-1(jtr)
int gauss_newton(int n, int m,
               void (*func)(int n,double *x_values,double *y_values, double *init_guess, double *s),
               void (*jacobian)(int n,int m,double **a,double *x_values,double *y_values, double *init_guess),
               double *x_values,double *y_values,double *init_guess,double *tol,int n_iters) {

    double **a,**b,**c,*d,*e,*rhs;
    int *rindex,i_iter,stop;
    stop = 0;
    a = alloc_matrix(n,m);//jacob
    b = alloc_matrix(m,n);//jacobT
    c = alloc_matrix(m,m);//jacobt.jacob ie b.a
    d = malloc(n * sizeof(double));//r
    e = malloc(m * sizeof(double));//for gauss
    rhs = malloc(m* sizeof(double));//func w/updated  //Ax=b->x=(A^-1)b or linear solve for x using A and rhs=b
    rindex = (int *) malloc(m * sizeof(int));

    i_iter = 0;
    while(i_iter < n_iters) {
        stop = 0;
        (*func)(n, x_values, y_values, init_guess, d);
        (*jacobian)(n, m, a, x_values, y_values, init_guess);//J=a
	//func(n, x_values, y_values, init_guess, d);
        //jacobian(n, m, a, x_values, y_values, init_guess);//J=a
        matrix_transpose(n, m, b, a);//Jt=b
        matrix_dotproduct(n, m, b, a, c);//jt.j=c     b.a=c   a = nxm b = mxn c = mxm
        matrix_vectordotproduct(n, m, b, d, rhs);//jt.d=rhs  jacTrans.func=rhs
        gauss_pivotmax(m,c,rhs,e,rindex,1.0e-12);
        for (int i = 0; i < m; i++) {
            init_guess[i] -= e[rindex[i]];
            if(fabs(e[rindex[i]]) < tol[i]){stop++;}
        }
        if (stop == 3) {
            fprintf(stderr,"Tolerance Reached\n");
            break;}
        i_iter++;
	//dump_matrix(m, m, c);
    }
    if (stop < 3){
        fprintf(stderr,"Max Iterations Reached\n");
    }
    fprintf(stderr,"c   = %10.5f final step = %10.8g\n",init_guess[0],e[rindex[0]]);
    fprintf(stderr,"a   = %10.5f final step = %10.8g\n",init_guess[1],e[rindex[1]]);
    fprintf(stderr,"tau = %10.5f final step = %10.8g\n",init_guess[2],e[rindex[2]]);
    
    //dump_matrix(m, m, c);
    get_inverse3(m, c);
    
    free_matrix(n, a);
    free_matrix(m, b);
    free_matrix(m, c);
    free(d);
    free(e);
    free(rhs);
    free(rindex);
    return 0;
}
