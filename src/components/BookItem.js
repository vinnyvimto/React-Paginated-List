import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

export default class BookItem extends React.Component {
    render() {
        return (
            <Col lg={6} xl={6} style={{ padding: "1rem" }}>
                <Card style={{ minWidth: "20rem", height: "100%" }}>
                    <Card.Body>
                        <div style={{ height: "100%" }} className="d-flex flex-column justify-content-between">
                            <Card.Title>{this.props.book.book_title}</Card.Title>
                            <ul className="list-unstyled">
                                <li className="text-muted">{this.props.book.book_author.join(', ')}</li>
                                <li><strong>Publication Year</strong>: {this.props.book.book_publication_year}</li>
                                <li><strong>Publication City</strong>: {this.props.book.book_publication_city}, {this.props.book.book_publication_country}</li>
                                <li><strong>Pages</strong>: {this.props.book.book_pages || "N/A"}</li>
                            </ul>
                        </div>
                    </Card.Body>
                </Card>
            </Col >
        );
    }
}
