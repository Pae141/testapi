import { useState, useEffect } from "react";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://api.finearts.go.th/data/api/archeology/search?provCode=10", {
            method: "GET", // หรือ "POST", "PUT", "DELETE" ตาม API
            headers: {
                "Content-Type": "x-api-key",
                "Authorization": "tu5oNUVwwypW7IkBFuN3" // ใช้ Bearer Token
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
            <h1>📋 รายชื่อผู้ใช้</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <strong>{user.name}</strong> - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}
