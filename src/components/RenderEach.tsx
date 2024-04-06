import { Children, ReactNode } from 'react';

interface RenderEachProps<T> {
  render: (item: T, index: number, array: T[]) => ReactNode;
  of: T[];
}

export const RenderEach = <T,>({ render, of }: RenderEachProps<T>) => Children.toArray((of || []).map((item, index, array) => render(item, index, array)));

