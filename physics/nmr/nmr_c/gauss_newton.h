int gauss_newton(int n, int m,
               void (*func)(int n,double *x_values,double *y_values, double *init_guess, double *s),
               void (*jacobian)(int n,int m,double **a,double *x_values,double *y_values, double *init_guess),
               //void (*matrix_transpose)(int n,int m, double **a, double **b),
               //void (*matrix_dotproduct)(int n,int m, double **a, double **b, double **c),
               //void (*matrix_vectordotproduct)(int n,int m, double **a, double *b, double *c),
               double *x_values,double *y_values,double *init_guess,double *tol,int n_iters);
