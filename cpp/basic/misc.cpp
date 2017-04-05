#include <iostream>

int main() {
  // c++11 中新增了 基于范围的for循环，便于操作数组或容器类
  double prices[5] = {4.99, 10.99, 6.87, 7.99};
  for (double x : prices) {
    std::cout << x << std::endl;
  }

  double (*pf)(int);  // pf points to a function that returns double
  double *pf(int);  // pf() a function that returns a pointer-to-double

  // 以下三种写法都正确
  const double *f1(const double ar[], int n);
  const double *f2(const double [], int);
  const double *f3(const double *, int);
  // 声明一个指针，指向以上三个函数之一
  const double *(*p1)(const double *, int) = f1;
  auto p1 = f2;  // c++11 automatic type deduction 自动类型推断
  // 声明一个 函数指针数组，包含以上三个函数
  const double *(*pa[3])(const double *, int) = {f1, f2, f3};
  auto pb = pa;  // pa pb 都是指向函数指针的指针
  // 调用函数
  const double *px = pa[0](av, 3);
  const double *py = (*pb[1])(av, 3);
  // 创建指向整个数组的指针
  auto pc = &pa;  // c++11
  const double *(*(*pd)[3])(const double *, int) = &pa;  // c++98
  **&pa == *pa == pa[0];

  // 使用 typedef 起别名做简化
  typedef const double *(*p_fun)(const double *, int);  // p_fun now a type name
  p_fun p1 = f1;  // p1 points to the f1() function
  p_fun pa[3] = {f1, f2, f3};
  p_fun(*pd)[3] = &pa;  // pd points to an array of 3 function pointers

  return 0;
}