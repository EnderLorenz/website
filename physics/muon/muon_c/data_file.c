#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include "data_file.h"

int read_data_file(char *file_name,struct point2d **data_ptr) {
  int n_points,n_alloc;
  double x,y;
  FILE *stream;

  stream = fopen(file_name,"r");
  if (stream == NULL) {
    fprintf(stderr,"Can't open file '%s' for reading\n",file_name);
    return(-1);
  }
  n_points = 0;
  n_alloc = 0;
  *data_ptr = NULL;
  while (fscanf(stream,"%lf %lf",&x,&y) == 2) {
    if (n_points >= n_alloc) {
      n_alloc += 10;
      *data_ptr = realloc(*data_ptr,n_alloc * sizeof(struct point2d));
    }
    (*data_ptr)[n_points].x = x;
    (*data_ptr)[n_points].y = y;
    n_points++;
  }
  fclose(stream);
  return(n_points);
}
