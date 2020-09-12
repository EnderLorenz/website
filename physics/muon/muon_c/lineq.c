#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include "lineq.h"

/*
   This function allocates memory for a two dimensional matrix of
   arbitrary size by allocating an array for each of the rows in the
   matrix, and also for an array of pointers to each row. n is the
   number of rows and m is the number of columns in each row. The matrix
   elements may be extracted with two subscripts for row and column.
   For example, if the pointer returned by this function is stored in
   the variable double **matrix, then matrix[i][j] gives the element
   at row index i and column index j.
*/
double **alloc_matrix(int n,int m) {
  int i;
  double **matrix;

  matrix = (double **) malloc(n * sizeof(double *));
  if (matrix == NULL) return(NULL);
  i = 0;
  while (i < n) {
    matrix[i] = (double *) malloc(m * sizeof(double));
    i++;
  }
  return(matrix);
}

/*
   This function frees memory allocated by alloc_matrix().
*/
void free_matrix(int n,double **matrix) {
  int i;
  i = 0;
  while (i < n) {
    if (matrix[i]) free(matrix[i]);
    i++;
  }
  free(matrix);
  return;
}

void dump_matrix(int n,int m,double **matrix) {
  int i,j;
  i = 0;
  while (i < n) {
    j = 0;
    while (j < m) {
      printf("%.8g ",matrix[i][j]);
      j++;
    }
    putchar('\n');
    i++;
  }
  return;
}

/*
   This functions solves a system of n linear equations in n
   unknowns by Gaussian elimination. A first pass is made to
   reduce the system matrix to upper diagonal, and then a
   separate pass is made for backsubstitution. The coefficients
   are supplied in a two dimensional n by n matrix coeff, as
   allocated by the function alloc_matrix(). The RHS vector is
   supplied in the array rhs. This function will
   write the solution into the array x, which must
   be allocated by the calling program. The min argument
   specifies the minimum value for a pivot element for the matrix
   to be considered non-singular. No intelligent pivoting
   is done by this function.
   The function returns 0 for a successful solution, or 1 for a
   singular matrix.
*/
int gauss(int n,double **coeff,double rhs[],double x[],double min) {
  int i,j,k;
  double factor,sum;

  k = 0;
  while (k < n - 1) {   /*loop down diagonal pivot elements*/
    if (fabs(coeff[k][k]) < min) {
      return(1);
    }
    i = k + 1;
    while (i < n) {   /*loop down rows under pivot row*/
      factor = coeff[i][k] / coeff[k][k];
      j = k + 1;
      while (j < n) {   /*loop over columns to the right of pivot column*/
        coeff[i][j] -= factor * coeff[k][j];
        j++;
      }
      rhs[i] -= factor * rhs[k];
      i++;
    }
    k++;
  }
  i = n - 1;
  while (i >= 0) {   /*loop up rows for backsubstitution*/
    if (fabs(coeff[i][i]) < min) {
      return(1);
    }
    sum = 0.0;
    j = i + 1;
    while (j < n) {   /*loop over columns for summation*/
      sum += coeff[i][j] * x[j];
      j++;
    }
    x[i] = (rhs[i] - sum)/ coeff[i][i];
    i--;
  }
  return(0);
}

/*
   This functions solves a system of n linear equations in n
   unknowns by Gaussian elimination. A first pass is made to
   reduce the system matrix to upper diagonal, and then a
   separate pass is made for backsubstitution. The coefficients
   are supplied in a two dimensional n by n matrix coeff, as
   allocated by the function alloc_matrix(). The RHS vector is
   supplied in the array rhs. This function will
   write the solution into the array x, which must
   be allocated by the calling program. The min argument
   specifies the minimum value for a pivot element for the matrix
   to be considered non-singular. Pivoting is selected by finding
   the column element with the largest scaled absolute value. The
   array rindex, which must be allocated by the
   calling program, is set within this function to point to the final
   row solution after pivoting has rearranged the rows.
   The function returns 0 for a successful solution, or 1 for a
   singular matrix.
*/
int gauss_pivotmax(int n,double **coeff,double rhs[],double x[],int rindex[],double min) {
  int i,j,k,imax,temp;
  double *scale,factor,sum,coeffmax,coeffabs;

  scale = (double *) malloc(n * sizeof(double));
  i = 0;
  while (i < n) {
    rindex[i] = i;   /*initialize pivot row indeces*/
    scale[i] = fabs(coeff[i][0]);   /*find maximum row coefficient*/
    j = 1;
    while (j < n) {
      coeffabs = fabs(coeff[i][j]);
      if (coeffabs > scale[i]) scale[i] = coeffabs;
      j++;
    }
    if (scale[i] < min) {
      free(scale);
      return(1);
    }
    i++;
  }
  k = 0;
  while (k < n - 1) {   /*loop over pivot columns*/
    imax = k;   /*initialize search for maximum canditate pivot elements*/
    coeffmax = fabs(coeff[rindex[k]][k]) / scale[rindex[k]];
    i = k + 1;
    while (i < n) {   /*loop over remaining unpivoted rows to find maximum remaining coefficient for pivot*/
      coeffabs = fabs(coeff[rindex[i]][k]) / scale[rindex[i]];
      if (coeffabs > coeffmax) {
        coeffmax = coeffabs;
        imax = i;
      }
      i++;
    }
    if (coeffmax < min) {
      free(scale);
      return(1);
    }
    if (imax != k) {   /*swap in best pivot row if necessary*/
      temp = rindex[imax];
      rindex[imax] = rindex[k];
      rindex[k] = temp;
    }
    i = k + 1;
    while (i < n) {   /*loop down rows under pivot row*/
      factor = coeff[rindex[i]][k] / coeff[rindex[k]][k];
      j = k + 1;
      while (j < n) {   /*loop over columns to the right of pivot column*/
        coeff[rindex[i]][j] -= factor * coeff[rindex[k]][j];
        j++;
      }
      rhs[rindex[i]] -= factor * rhs[rindex[k]];
      i++;
    }
    k++;
  }
  i = n - 1;
  while (i >= 0) {   /*loop up rows for backsubstitution*/
    if (fabs(coeff[rindex[i]][i]) < min) {
      free(scale);
      return(1);
    }
    sum = 0.0;
    j = i + 1;
    while (j < n) {   /*loop over columns for summation*/
      sum += coeff[rindex[i]][j] * x[rindex[j]];
      j++;
    }
    x[rindex[i]] = (rhs[rindex[i]] - sum)/ coeff[rindex[i]][i];
    i--;
  }
  free(scale);
  return(0);
}
