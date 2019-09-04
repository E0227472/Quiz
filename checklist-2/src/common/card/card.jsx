import React from "react";
import styles from "./card.module.css";
import Form from "../form";

class Card extends Form {
  render() {
    return (
      <div className = {styles.card}>
      <div className="card bg-light mb-3">
        <div className="card-body">
          <form>
          {this.props.children}
          </form>
        </div>
      </div>
      </div >
    );
  }
}

export default Card;
