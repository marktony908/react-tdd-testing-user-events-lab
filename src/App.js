import React, { useState } from 'react';

function App() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        interests: []
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prevData => ({
                ...prevData,
                interests: checked
                    ? [...prevData.interests, value]
                    : prevData.interests.filter(interest => interest !== value)
            }));
        } else {
            setFormData(prevData => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <fieldset>
                    <legend>Interests</legend>
                    <label>
                        <input
                            type="checkbox"
                            name="interests"
                            value="coding"
                            checked={formData.interests.includes('coding')}
                            onChange={handleChange}
                        />
                        Coding
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="interests"
                            value="design"
                            checked={formData.interests.includes('design')}
                            onChange={handleChange}
                        />
                        Design
                    </label>
                </fieldset>

                <button type="submit">Submit</button>
            </form>

            {submitted && (
                <p>
                    Thank you, {formData.name}! 
                    {formData.interests.length > 0 && ` Interests: ${formData.interests.join(', ')}`}
                </p>
            )}
        </div>
    );
}

export default App;
