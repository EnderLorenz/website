double **alloc_matrix(int n,int m);
void free_matrix(int n,double **matrix);
void dump_matrix(int n,int m,double **matrix);
int gauss(int n,double **coeff,double rhs[],double x[],double min);
int gauss_pivotmax(int n,double **coeff,double rhs[],double x[],int rindex[],double min);
