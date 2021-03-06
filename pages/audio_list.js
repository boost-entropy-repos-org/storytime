import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from 'react-player';
import AudioPlayer from 'react-h5-audio-player';

class AudioList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      selected: '',
      audioUrl: '',
      baseUrl: 'https://storage.googleapis.com/storytime-audio/',
    };
    this.fileList = this.fileList.bind(this);
    this.handleSelectorChange = this.handleSelectorChange.bind(this);
  }

  fileList() {
    return this.state.files.map(f => <li value={f.url}>{f.name}</li>);
  }

  buildAudioPlayer() {
    if (this.state.audioUrl) {
      return (
        <audio src={this.state.audioUrl} controls={true} type={"audio/mp3"}/>
      );
    }
  }

  componentDidMount() {
    fetch('/api/fetchFiles')
      .then(res => res.json())
      .then(result => {
        console.log(result);
        const formatted = result.map(file => {
          return { key: file.name, text: file.name, value: file.url };
        });
        if (formatted) {
          this.setState({ files: formatted });
          this.setState({ audioUrl: formatted[0].value });
        }
      });
  }

  handleSelectorChange(event) {
    this.setState({
      selected: event.target.value,
      audioUrl: this.state.baseUrl + event.target.value
    });
  }

  render() {
    return (
      <div style={{ width: '700px', margin: 'auto', padding: '50px' }}>
        <div>Select article to being listening:</div>
        <div>
          <select
            value={this.state.selected}
            onChange={this.handleSelectorChange}
          >
            {this.state.files.map(f => (
              <option key={f.key + 'list'} value={f.url}>
                {f.key}
              </option>
            ))}
          </select>
        </div>
        <br />
        <br />
        <div>{this.buildAudioPlayer()}</div>
      </div>
    );
  }
}

export default AudioList;
