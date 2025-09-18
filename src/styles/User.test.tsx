import { render, screen, waitFor } from "@testing-library/react";
//import User from "./User";
import User from "@/components/User";

test("renders user data from API", async () => {
  render(<User />);

  // Kiểm tra ban đầu
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();

  // Chờ data từ mock API
  const user = await waitFor(() => screen.getByText(/John Doe/i));

  // Xác nhận text hiển thị
  expect(user).toBeInTheDocument();
});
/*write unit test for user by react library. */
