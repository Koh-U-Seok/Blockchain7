declare type TError<T> = {
  isError: true;
  msg: T;
};
// <R> || <T> << 타입을 가져다가 사용(호출)할 때 어떤 타입인지 받겠다. 제네릭(Generic)
// 타입에서의 매개변수 정도의 느낌

declare type TValue<T> = {
  isError: false;
  value: T;
};

declare type TResult<T, U> = TValue<T> | TError<U>;
// 두 결과를 하나로 함친다.
// TValue<T> 또는 TError<U>가 나오는 type을 설정한다.
