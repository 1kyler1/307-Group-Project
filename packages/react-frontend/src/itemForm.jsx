import React, { useState } from "react";

export default function ItemForm(props) {


    const [form, setForm] = useState({item:'', description:''});
    function handleSubmit(event) {
        const { name, value } = event.target;
        setForm({...form, [name]: value});
    }

    function submitForm() {

        props.handleSubmit(form);
        setForm({item: '', description: ''});

    }

    return (

        <form>
            <label htmlFor="name">Item</label>
            <input
                type="text"
                name="item"
                id="item"
                value={form.title}
                onChange={handleSubmit}
            />
            <label htmlFor="description">Description</label>
        <input
            type="text"
            name="description"
            id="description"
            value={form.description}
            onChange={handleSubmit}
        />
        <input type="button" value="Submit" onClick={submitForm} />
        </form>

    );


}