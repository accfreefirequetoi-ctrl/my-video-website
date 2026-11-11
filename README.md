# Website video lặp vô hạn

## 1. Thêm video của bạn
Đổi tên video thành `video.mp4`, sau đó đặt vào thư mục `videos/`:
`videos/video.mp4`

Nên dùng MP4 (H.264 video + AAC audio) để tương thích rộng.

## 2. Xem thử trên máy tính
Cần cài Python 3. Mở terminal trong thư mục dự án và chạy:

```bash
python server.py
```

Mở `http://localhost:8000`.

Không nên mở `index.html` bằng cách nhấp đúp vì một số tính năng trình duyệt hoạt động ổn định hơn qua HTTP.

## 3. Đưa website lên Internet
Tải toàn bộ thư mục dự án (giữ nguyên cấu trúc) lên dịch vụ hosting website tĩnh có hỗ trợ HTTPS, ví dụ GitHub Pages, Cloudflare Pages hoặc Netlify. Sau khi xuất bản, dịch vụ sẽ cấp cho bạn một URL công khai để chia sẻ.

## Giới hạn trình duyệt cần biết
- Video được đặt lặp vô hạn và không hiện thanh điều khiển mặc định.
- Tự phát **có âm thanh** thường bị Chrome, Safari và các trình duyệt khác chặn. Khi bị chặn, người xem phải nhấn “Phát video”.
- Website không thể ép toàn màn hình ngay khi vừa mở trang. Trình duyệt thường yêu cầu thao tác chạm/nhấp của người dùng. Nút “Toàn màn hình” là phương án dự phòng.
- iPhone/iPad giới hạn Fullscreen API khác với máy tính và Android; website không thể bảo đảm toàn màn hình trên mọi phiên bản Safari.
- Không có cách khóa tuyệt đối video: người xem vẫn có thể dùng công cụ trình duyệt hoặc ghi màn hình. Các thuộc tính ngăn tải/chỉnh phát chỉ ẩn giao diện điều khiển thông thường, không phải DRM.

## Tùy chỉnh
- Đổi tiêu đề trong `index.html`.
- Đổi cách video lấp khung bằng `object-fit: contain` trong `style.css` thành `cover` nếu muốn lấp kín màn hình (có thể cắt mất một phần hình).
