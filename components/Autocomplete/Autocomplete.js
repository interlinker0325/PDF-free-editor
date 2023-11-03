import React, {Component, Fragment} from 'react';

class Autocomplete extends Component {
    static defaultProps = {
        suggestions: []
    };

    constructor(props) {
        super(props);

        this.state = {
            // The active selection index
            activeSuggestion: 0,
            // The suggestions that match the user's input
            filteredSuggestions: [],
            // Whether the suggestion list is shown
            showSuggestions: false,
            // What the user has entered
            userInput: '',

        };
    }

    onChange = e => {
        const {suggestions, coAuthors = []} = this.props;
        const userInput = e.currentTarget.value;

        let filteredSuggestions = coAuthors?.length ?
            suggestions.filter(suggestion=>
                !coAuthors.some(coauthor=>suggestion.fullname.toLowerCase() === coauthor.fullname.toLowerCase())
            ) : suggestions;
         filteredSuggestions = filteredSuggestions.filter(
            suggestion =>
                suggestion.fullname.toLowerCase().includes(userInput.toLowerCase())
        );
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
    };
    onClick = (e, userInput = false) => {
        e.stopPropagation();
        this.props.onClick(e, this.props.suggestions.filter(sug =>
            userInput ?
                sug.fullname === userInput
                : sug.fullname === e.currentTarget.innerText)[0]
        );
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: ''
        });
    };

    onKeyDown = e => {
        const {activeSuggestion, filteredSuggestions} = this.state;

        // User pressed the enter key
        if (e.keyCode === 13) {
            return;
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({activeSuggestion: activeSuggestion - 1});
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({activeSuggestion: activeSuggestion + 1});
        }
    };

    render() {
        const {activeSuggestion, filteredSuggestions, showSuggestions, userInput} = this.state;

        let suggestionsListComponent = (
            <div className='p-2 text-[#999] zindex-1'></div>
        );

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className='list-none w-[18rem] p-2 border-other border-[1px] drop-shadow-lg absolute bg-white mt-15 mt-0 max-h-[320px] overflow-y-auto'>
                        {filteredSuggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className={index === activeSuggestion ?
                                    'text-other underline underline-offset-2 cursor-pointer font-normal w-full'
                                    : 'p-2 hover:bg-primary hover:text-white hover:cursor-pointer hover:font-normal w-full'
                                }
                                onClick={this.onClick}>
                                {suggestion.fullname}
                            </li>
                        ))}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div
                        className='w-[18rem] p-2 border-other border-[1px] drop-shadow-lg text-other absolute bg-white ml-0 mt-15 mt-0 max-h-[143px] w-64'>
                        <em>No hay estudiantes</em>
                    </div>
                );
            }
        }

        return (
            <div className='h-[36px] bg-transparent w-2/4 justify-center cursor-pointer font-normal gap-3.5 p-0'>
                <input
                    type='text'
                    className={
                        `${this.props.coAuthors?.length > 0 ?
                            'placeholder:text-other text-other border-b-other' : 'placeholder:text-titleInput text-titleInput border-b-black'} 
                            bg-transparent input placeholder:font-normal placeholder:text-lg h-[36px] drop-shadow-lg w-full border-2 font-normal text-lg input-ghost border-transparent rounded-none px-0`}
                    placeholder={this.props.placeholder}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    value={userInput}/>
                {suggestionsListComponent}
            </div>
        );
    }
}

export default Autocomplete;
