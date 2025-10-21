import React, { useState } from "react";

export default function itemForm(props) {


    const [form, setForm] = useState({item:'', description:''});
    function handleSubmit(event) {
        const { name, value } = event.target;
        setForm({...listing, [name]: value});
    }

    function submitForm() {

        props.handleSubmit(form);
        setForm({item: '', iescription: ''});

    }

    return (

        <form>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="item"
                id="item"
                value={form.title}
                onChange={handleSubmit}
            />
            <label htmlFor="job">Job</label>
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