import { useState, useEffect } from 'react';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || '';

export default function Home() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(new Set());
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${BACKEND}/api/sheet`)
      .then(r => r.json())
      .then(data => {
        setRows(data.rows || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setMessage('Failed to load sheet');
        setLoading(false);
      });
  }, []);

  const toggle = (idx) => {
    const s = new Set(selected);
    if (s.has(idx)) s.delete(idx);
    else s.add(idx);
    setSelected(s);
  };

  const saveSelection = async () => {
    if (selected.size === 0) {
      setMessage('กรุณาเลือกแถวอย่างน้อย 1 แถว');
      return;
    }
    const selections = Array.from(selected).map(i => rows[i]);
    try {
      const res = await fetch(`${BACKEND}/api/selection`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selections })
      });
      const json = await res.json();
      if (res.ok) {
        setMessage('บันทึกเรียบร้อย id: ' + json.id);
        setSelected(new Set());
      } else {
        setMessage('Error: ' + (json.error || JSON.stringify(json)));
      }
    } catch (err) {
      console.error(err);
      setMessage('Network error');
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (!rows || rows.length === 0) return <div style={{ padding: 20 }}>ไม่มีข้อมูลจาก sheet</div>;

  const headers = Object.keys(rows[0]);

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Sheet Selector</h1>
      <p>จำนวนแถว: {rows.length}</p>
      <div style={{ marginBottom: 10 }}>
        <button onClick={saveSelection}>บันทึกการเลือก</button>
        <span style={{ marginLeft: 10 }}>{message}</span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table border="1" cellPadding="6" style={{ borderCollapse: 'collapse', minWidth: 800 }}>
          <thead>
            <tr>
              <th>เลือก</th>
              {headers.map(h => <th key={h}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} style={{ background: selected.has(idx) ? '#e6f7ff' : 'white' }}>
                <td>
                  <input type="checkbox" checked={selected.has(idx)} onChange={() => toggle(idx)} />
                </td>
                {headers.map(h => <td key={h + idx}>{row[h]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
