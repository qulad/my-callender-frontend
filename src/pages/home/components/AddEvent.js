import React, { useState, useEffect } from 'react';
import PathConstants from 'routes/PathConstant';
import { useNavigate } from 'react-router-dom';

const AddEvent = () => {
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const access_token = localStorage.getItem('access_token');

    useEffect(() => {
        if (access_token === null) {
            navigate(PathConstants.LOGIN);
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const eventData = {
            description,
            location,
            date,
        };

        try {
            const response = await fetch(PathConstants.BACKEND.EVENT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                body: JSON.stringify(eventData)
            });

            if (response.status === 401) {
                navigate(PathConstants.LOGIN);
                return;
            }

            if (!response.ok) {
                console.log(response);
                throw new Error(`HTTP status ${response.status}`);
            }

            window.location.reload();

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label>
                Etkinlik İsmi: 
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '6px 12px', fontSize: '1em', fontFamily: 'Arial, sans-serif' }} />
            </label>
            <label>
                Etkinlik Konumu: 
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '6px 12px', fontSize: '1em', fontFamily: 'Arial, sans-serif' }} />
            </label>
            <label>
                Etkinlik Tarihi: 
                <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '6px 12px', fontSize: '1em', fontFamily: 'Arial, sans-serif' }} />
            </label>
            <input type="submit" value="Etkinlik Oluştur" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '14px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em', fontFamily: 'Arial, sans-serif' }} />
        </form>
    );
};

export default AddEvent;