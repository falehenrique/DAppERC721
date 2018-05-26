import React from "react";
import Slider from "react-slick";
import './CardSlider.css';
import { connect } from 'react-redux'
import { web3connect, fetchCards, buyCard, instantiateMTGCardsContract } from './../actions';

class CardSlider extends React.Component {
  constructor(props) {
    super(props)

    this.renderCards.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See actions/index.js => web3connect for more info.
    window.addEventListener('load', () => {
      this.props.web3connect();
      this.props.instantiateMTGCardsContract().then(() => {
        this.props.fetchCards(true);
      });
    });
  }

  renderCards(mtgCards) {
    return mtgCards.map(card => {
      return <div key={card.id + "available cards"}> 
        <img id={card.id} className="slider-image" alt="" src={card.url}  onClick={this.availableCardClicked.bind(this)} />
      </div>
    });
  }

  availableCardClicked(e, data) {
    const id = e.target.id;
    const url = e.target.src;
    this.props.instantiateMTGCardsContract().then(() => {
      this.props.buyCard({ 
        id: id,
        url: url
      });
    });
  }


  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 6,
      arrows: true
    };
    return (
      <Slider {...settings}>
        {this.renderCards(this.props.mtgCards)}
      </Slider>
    );
  }
}
const mapDispatchToProps = {
  web3connect,
  instantiateMTGCardsContract,
  fetchCards,
  buyCard
};

const mapStateToProps = (state) => ({
  web3: state.web3,
  cardsContract: state.cardsContract, 
  mtgCards: state.mtgCards
});

export default connect(mapStateToProps, mapDispatchToProps)(CardSlider);
