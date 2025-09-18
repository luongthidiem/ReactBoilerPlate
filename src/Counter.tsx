import { increment, decrement, incrementByAmount } from "./store/CounterSlice";
import { useAppDispatch, useAppSelector } from "./store/Hooks";

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Count: {count}</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button onClick={() => dispatch(increment())}>+1</button>
        <button onClick={() => dispatch(decrement())}>-1</button>
        <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
      </div>
    </div>
  );
}
