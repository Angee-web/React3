import { Component } from 'react';
import './App.css';

// Define types Person object
interface Person {
  fullName: string;
  bio: string;
  imgSrc: string;
  profession: string;
}

// Define type for for state object
interface AppState {
  Person: Person;
  shows: boolean; // Boolean to control visibility of the profile
  mountTime: number;
  elapsedTime: number;
}

// Define App component
class App extends Component<{}, AppState> {
  private timerID: number | undefined; // ID for the timer

  constructor(props: {}) {
    super(props);
    this.state = {
      Person: {
        fullName: 'Usman Oni',
        bio: 'Software Engineer',
        imgSrc: 'https://media.licdn.com/dms/image/v2/C4D03AQELyzBxPLOooA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1659093778204?e=1731542400&v=beta&t=b8SqpzQvjBWX20p0pmUK3UOMzqbIouJn9CAmw84LUSI',
        profession: 'Agba Dev',
      },
      shows: false,
      mountTime: Date.now(),
      elapsedTime: 0,
    };
  }

  componentDidMount() {
    // Start a timer to update the elapsed time
    this.timerID = window.setInterval(() => {
      this.setState({
        // Calculate elapsed time in seconds
        elapsedTime: Math.floor((Date.now() - this.state.mountTime) / 1000)
      });
    }, 1000);
  }

  componentWillUnmount() {
    // Clear the timer when the component unmounts to avoid memory leaks
    if (this.timerID !== undefined) {
      window.clearInterval(this.timerID);
    }
  }

  toggleShow = () => {
    // Toggle the visibility of the profile
    this.setState(prevState => ({
      shows: !prevState.shows
    }));
  }

  render() {
    const { Person, shows, elapsedTime } = this.state;

    return (
      <div className="App">
         {/* Button to toggle profile visibility */}
        <button onClick={this.toggleShow}>
          {shows ? 'Hide Profile' : 'Show Profile'}
        </button>
        
         {/* Conditionally render the profile details if `shows` is true */}
        {shows && (
          <div className='info'>
            <h1>{Person.fullName}</h1>
            <p>{Person.bio}</p>
            <img src={Person.imgSrc} alt={Person.fullName} />
            <p>{Person.profession}</p>
          </div>
        )}
        
         {/* Display the time elapsed since the component was mounted */}
        <p>Time since mount: {elapsedTime} seconds</p>
      </div>
    );
  }
}

export default App;
