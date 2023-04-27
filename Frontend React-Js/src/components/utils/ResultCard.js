import React from 'react'

export default function ResultQuery(props) {
    const [query, setQuery] = React.useState(props.query)
    console.log(query);
    const textSlice = query[1].slice(0, 64) + " ...";
    const [text, setText] = React.useState(textSlice);

    let time;
    const completText = () => {
        time = setTimeout(function () {
            setText(query[1]);
        }, 400);
    }
    const shortText = () => {
        clearTimeout(time);
        setText(textSlice);
    }
    return (
        <div className="card">
            <div
                className={query[2] ? "icon br-red" : "icon br-green"}
                onMouseOver={completText} onMouseOut={shortText}
            >
            </div>
            <div className="card-info">
                <p
                    onMouseOver={completText} onMouseOut={shortText}

                >
                    <a href={`https://www.google.com/search?q=" ${query[1]} "`} target="_blank" >
                        {text}
                    </a>
                </p>
                <h3>
                    {query[2] ? "Plagiat" : "Unique"}
                </h3>
            </div>
            <h3 className="percentage">{Math.floor(query[0] * 100)}%</h3>
        </div>
    );
}
