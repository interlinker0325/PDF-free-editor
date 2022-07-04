import React, { Component, Fragment } from 'react';

class Autocomplete extends Component {
    static defaultProps = {
        suggestions: []
    };

    constructor(props) {
        super(props);

        this.state = {
            // The active selection's index
            activeSuggestion: 0,
            // The suggestions that match the user's input
            filteredSuggestions: [],
            // Whether or not the suggestion list is shown
            showSuggestions: false,
            // What the user has entered
            userInput: ""
        };
    }

    onChange = e => {
        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;

        const filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion.fullname.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
    };

    onClick = e => {
        this.props.onClick(e, this.props.suggestions.filter(sug => sug.fullname === e.currentTarget.innerText)[0]);
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: ''
        });
    };

    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        // User pressed the enter key
        if (e.keyCode === 13) {
        this.setState({
            activeSuggestion: 0,
            showSuggestions: false,
            userInput: filteredSuggestions[activeSuggestion]
        });
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;

        let suggestionsListComponent = (
            <div className="p-2 text-[#999] zindex-1"></div>
        );

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="list-none mt-0 max-h-[143px] overflowy-auto pl-0 w-[calc(300px + 1rem)]">
                        {filteredSuggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className={index === activeSuggestion ?
                                    'bg-[#008f68] text-[#fae042] cursor-pointer font-normal'
                                    : 'p-2 hover:bg-[#008f68] hover:text-[#fae042] hover:cursor-pointer hover:font-normal'
                                }
                                onClick={onClick}>
                                {suggestion.fullname}
                            </li>
                        ))}
                    </ul>
                );
                console.log('OVER Render!!!', filteredSuggestions, suggestionsListComponent);
            } else {
                suggestionsListComponent = (
                    <div className="p-2 text-[#999]">
                        <em>No suggestions, you're on your own!</em>
                    </div>
                );
            }
        }

        return (
            <div className='flex flex-col h-[36px] w-2/4 justify-center cursor-pointer font-normal gap-3.5 p-0'>
                <input
                    type='text'
                    className='input shadow-lg w-full text-titleInput border-b-black border-2 font-normal text-lg input-ghost border-transparent rounded-none w-full px-0'
                    placeholder={this.props.placeholder}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput} />
                    {suggestionsListComponent}
            </div>
        );
    }
}

export default Autocomplete;
