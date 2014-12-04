#include <stdio.h>

int main(void){
    char s[256];
    FILE *i = fopen("input","r");
    FILE *o = fopen("output","w");
    if(i==NULL||o==NULL){
        exit(-1);
    }
    while(fgets(s,256,i)!=NULL){
        printf("%s",s);
    }
    fprintf(o,"hogehoge");
    fclose(i);
    fclose(o);
}
