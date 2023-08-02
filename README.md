# Clean Architecture

**Project** là một dự án mẫu được tổ chức với cấu trúc thư mục theo mô hình thiết kế "Clean Architecture". Mô hình này giúp tách biệt các lớp của ứng dụng và tăng tính tổ chức, sự linh hoạt và tái sử dụng mã nguồn. Dự án tập trung vào việc quản lý người dùng và cung cấp các tính năng xác thực (authentication) thông qua giao diện HTTP. Dự án được xây dựng trên Node.js và sử dụng các module như ExpressJS để xây dựng server và mongodb để lưu trữ dữ liệu người dùng.

## Cấu trúc thư mục

Dự án được tổ chức theo cấu trúc thư mục theo mô hình Clean Architecture như sau:

```bash
project/
├─ src/
│   ├─ domain/
│   │   ├─ user/
│   │   │   ├─ user.entity.js
│   │   │   └─ user.repository.js
│   │   └─ ...
│   ├─ application/
│   │   ├─ user/
│   │   │   ├─ user.service.js
│   │   │   └─ ...
│   │   └─ ...
│   ├─ infrastructure/
│   │   ├─ database/
│   │   │   └─ db.config.js
│   │   └─ ...
│   └─ interfaces/
│       ├─ http/
│       │   ├─ controllers/
│       │   │   ├─ auth.controller.js
│       │   │   └─ ...
│       │   ├─ routes/
│       │   │   ├─ auth.routes.js
│       │   │   └─ ...
│       │   └─ middlewares
│       │   |   ├─ auth.middleware.js
│       │   └─ server.js
│       └─ ...
├─ test/
│   ├─ unit/
│   │   ├─ application/
│   │   │   ├─ user/
│   │   │   │   ├─ user.service.spec.js
│   │   │   │   └─ ...
│   │   │   └─ ...
│   │   ├─ interfaces/
│   │   │   ├─ http/
│   │   │   │   ├─ controllers/
│   │   │   │   │   ├─ auth.controller.spec.js
│   │   │   │   │   └─ ...
│   │   │   │   ├─ routes/
│   │   │   │   │   ├─ auth.routes.spec.js
│   │   │   │   │   └─ ...
│   │   │   │   └─ ...
│   │   └─ ...
│   └─ ...
├─ package.json
├─ package-lock.json
└─ ...
```

## Giải thích vị trí các thư mục

1. **Domain**:
   - Thư mục này chứa các đối tượng (entities) cốt lõi của ứng dụng và các logic liên quan đến chúng.
   - Ví dụ: trong thư mục `user`, chúng ta có `user.entity.js` để định nghĩa đối tượng người dùng và `user.repository.js` để thực hiện các tác vụ liên quan đến lưu trữ dữ liệu người dùng.

2. **Application**:
   - Thư mục này chứa các lớp dịch vụ (services) biểu diễn các use case (các trường hợp sử dụng) của ứng dụng.
   - Ví dụ: trong thư mục `user`, chúng ta có `user.service.js` để triển khai các chức năng xử lý người dùng như đăng nhập, đăng ký, v.v.

3. **Infrastructure**:
   - Thư mục này chứa các thành phần hạ tầng của ứng dụng như cơ sở dữ liệu, các cài đặt bên ngoài (external libraries), v.v.
   - Ví dụ: trong thư mục `database`, chúng ta có `db.config.js` để cấu hình kết nối với cơ sở dữ liệu **Mongodb**.

4. **Interfaces**:
   - Thư mục này chứa các giao diện (interfaces) mà ứng dụng cung cấp để tương tác với người dùng hoặc các thành phần bên ngoài khác.
   - Trong thư mục `http`, chúng ta có thư mục `controllers` để định nghĩa các điều khiển xử lý các yêu cầu HTTP và thư mục `routes` để định nghĩa các tuyến đường (routes) của ứng dụng.

5. **Test**:
   - Thư mục này chứa các tệp kiểm thử đơn vị (unit tests) cho các thành phần của ứng dụng.
   - Kiểm thử được tổ chức theo cấu trúc tương tự như mã nguồn của ứng dụng, giúp tạo ra sự phù hợp và dễ dàng tìm kiếm.

## Tích hợp thêm tính năng

Dự án này chỉ là một mẫu đơn giản và có thể mở rộng để tích hợp thêm các tính năng khác như đăng ký (signup), quên mật khẩu (forgot password), cập nhật thông tin người dùng (profile update), và nhiều tính năng khác. Bạn có thể thêm các file và chức năng mới vào các thư mục tương ứng để mở rộng dự án.

## Kiểm thử

Dự án có sẵn thư mục `test` chứa các file kiểm thử đơn vị (unit tests) cho các tầng ứng dụng. Bạn có thể chạy kiểm thử bằng lệnh:

```bash
npm test
```

## Đóng góp

Nếu bạn muốn đóng góp vào dự án, xin vui lòng tạo pull request và chờ phản hồi từ nhóm phát triển. Chúng tôi đánh giá cao mọi đóng góp tích cực từ cộng đồng.

## Tác giả

- Tên tác giả: [Mộc Lâm](https://github.com/your-username)
- Email: <mocduonglam86@gmail.com>