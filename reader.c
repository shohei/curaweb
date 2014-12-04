#include <stdio.h>

int main(void){
    FILE* f = fopen("input", "r");
    char buffer[6];
    int ret = fread(buffer, 5, 1, f);

    printf("%s",buffer);
    printf("%d",ret);
    /* if (fread(buffer, 5, 1, f) != 1) */
    return 0;
}
