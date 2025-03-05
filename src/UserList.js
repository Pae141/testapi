import { useState, useEffect } from "react";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://apiadmin.finearts.go.th/api/v1/archeology/search?provCode=12", {
            method: "GET",
            headers: {
                "x-api-key": "bw59garfwaqdyqphdyf4" // เปลี่ยนเป็น API Key ที่ถูกต้อง
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`เกิดข้อผิดพลาด: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setUsers(data);
                console.log("✅ ข้อมูลที่ได้รับจาก API:", data); // แสดงข้อมูลทั้งหมดใน Console
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>⏳ กำลังโหลดข้อมูล...</p>;
    if (error) return <p>❌ เกิดข้อผิดพลาด: {error}</p>;

    return (
        <div>
            <h1>📋 รายการข้อมูลที่ได้จาก API</h1>
            <ul style={{ paddingLeft: "20px" }}>
                {users.map((user, index) => (
                    <li key={index}>
                        <strong>รหัส: </strong>{user.id}<br />
                        <strong>ชื่อ: </strong>{user.name}<br />
                        <strong>สถานะ: </strong>{user.registration ? user.registration.status : "ไม่มีข้อมูล"}<br />
                        <strong>ตำบล: </strong>{user.tambon ? user.tambon : "ไม่มีข้อมูล"}<br />
                        <strong>อำเภอ: </strong>{user.amphoe ? user.amphoe : "ไม่มีข้อมูล"}<br />
                        <strong>จังหวัด: </strong>{user.province ? user.province : "ไม่มีข้อมูล"}<br />
                        <strong>สิ่งสำคัญ: </strong>{user.registration && user.registration.culture ? user.registration.culture : "ไม่มีข้อมูล"}<br />
                        <strong>ประวัติ: </strong>{user.registration && user.registration.history ? user.registration.history : "ไม่มีข้อมูล"}<br />
                        <strong>ปัจจุบัน: </strong>{user.registration && user.registration.present ? user.registration.present : "ไม่มีข้อมูล"}<br />
                    </li>
                ))}
            </ul>
        </div>
    );
}
