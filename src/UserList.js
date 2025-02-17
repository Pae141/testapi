import { useState, useEffect } from "react";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://api.finearts.go.th/data/api/archeology/search?provCode=10", {
            method: "GET",
            headers: {
                "x-api-key": "9Ne76huFHahuFr3GIFXL" // เปลี่ยนเป็น API Key ที่ถูกต้อง
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`เกิดข้อผิดพลาด: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("✅ ข้อมูลที่ได้รับจาก API:", data); // แสดงข้อมูลทั้งหมดใน Console
            setUsers(data); // เก็บข้อมูลที่ได้มาใน state
            setLoading(false);
        })
        .catch(error => {
            console.error("❌ เกิดข้อผิดพลาด:", error.message); // แสดง error ใน Console
            setError(error.message);
            setLoading(false);
        });
    }, []);

    if (loading) return <p>⏳ กำลังโหลดข้อมูล...</p>;
    if (error) return <p>❌ เกิดข้อผิดพลาด: {error}</p>;

    return (
        <div>
            <h1>📋 รายการข้อมูลที่ได้จาก API</h1>
            <pre>{JSON.stringify(users, null, 2)}</pre> {/* แสดง JSON ทั้งหมดที่หน้าเว็บ */}
        </div>
    );
}
