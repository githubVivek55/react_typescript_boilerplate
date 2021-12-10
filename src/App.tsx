import React, { ReactElement, ReactNode, useState } from 'react';
import './app.css';

//conventional props
function Heading({ title }: { title: string }) {
  return <h1>{title}</h1>;
}
function HeadingWithContent({ children }: { children: ReactNode }) {
  return <h1>{children}</h1>;
}

//default props
const defaultContainerProps = {
  heading: <strong>Default Heading text</strong>,
};
type ContainerProps = { children: ReactNode } & typeof defaultContainerProps;
function Container({ heading, children }: ContainerProps): ReactElement {
  return (
    <div>
      <h1>{heading}</h1>
      {children}
    </div>
  );
}
Container.defaultProps = defaultContainerProps;

//Functional props
function TextWithNumbers({
  children,
  header,
}: {
  children: (num: number) => ReactNode;
  header?: (num: number) => ReactNode;
}) {
  const [state, setState] = useState<number>(1);
  return (
    <div>
      {header?.(state)}
      {children(state)}
      <div>
        <button onClick={() => setState(state + 1)}>Add</button>
      </div>
    </div>
  );
}

//Generics for function
function List<ListItem>({
  items,
  render,
}: {
  items: ListItem[];
  render: (item: ListItem) => ReactNode;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
}

const App = () => {
  return (
    <div>
      <Heading title="hello there" />
      <hr />
      <HeadingWithContent>
        <strong>Hi</strong>
      </HeadingWithContent>
      <hr />
      <Container>Default props children</Container>
      <hr />
      <TextWithNumbers
        header={(num) => <h1>This is function as prop={num}</h1>}>
        {(num: number) => <h2>This is children as function={num}</h2>}
      </TextWithNumbers>
      <hr />
      <List items={[1, 2, 3, 4]} render={(item) => <strong>{item}</strong>} />
      <hr />
    </div>
  );
};

export default App;
