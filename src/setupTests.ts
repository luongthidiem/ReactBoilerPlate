import { server } from "@/mocks/Server"; // server mock của bạn
import "@testing-library/jest-dom"; // thêm matcher cho Jest
import "whatwg-fetch"; // polyfill fetch cho Node
import { cleanup } from "@testing-library/react"; // dọn dẹp DOM (nếu RTL < v15)

beforeAll(() =>
  // Bật server và báo lỗi nếu có request chưa được mock
  server.listen({ onUnhandledRequest: "error" }),
);

afterEach(() => {
  cleanup(); // dọn DOM sau mỗi test
  server.resetHandlers(); // reset mock để tránh test trước ảnh hưởng test sau
});

afterAll(() => server.close()); // đóng server sau khi xong tất cả test
