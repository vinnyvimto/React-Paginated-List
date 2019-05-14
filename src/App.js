import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Pagination from 'react-bootstrap/Pagination';
import Axios from 'axios';
import BookItem from './components/BookItem';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            books: [],
            paginator: {
                page: 1,
                itemsPerPage: 20,
                totalItems: null,
                pages: null,
            }
        }
    }

    componentDidMount() {
        this.getBooks(this.state.paginator);
    }

    getBooks(paginator) {
        Axios.post('http://nyx.vima.ekt.gr:3000/api/books', {
            page: paginator.page,
            itemsPerPage: paginator.itemsPerPage
        })
            .then(resp => {
                const p = {
                    ...paginator,
                    totalItems: resp.data.count,
                    pages: Math.ceil(resp.data.count / paginator.itemsPerPage)
                };

                this.setState({
                    loading: false,
                    books: resp.data.books,
                    paginator: p,
                })
            });
    }

    changePage(number) {
        const paginator = {
            ...this.state.paginator,
            page: number
        };

        this.getBooks(paginator);
    }

    render() {
        const bookItems = this.state.books.map(book => {
            return <BookItem book={book} key={book.id}></BookItem>;
        });

        const showNumber = 5;
        
        let begin = this.state.paginator.page - Math.floor(showNumber / 2);
        if (begin <= 1) {
            begin = 2;
        }

        let end = this.state.paginator.page + Math.floor(showNumber / 2);
        if (end >= this.state.paginator.pages) {
            end = this.state.paginator.pages - 1;
        }

        let items = [];

        if (this.state.paginator.page > Math.ceil(showNumber / 2) + 1) {
            items.push(<Pagination.Ellipsis key="before" disabled />);
        }

        for (let number = begin; number <= end; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === this.state.paginator.page}
                    onClick={() => this.changePage(number)}
                >
                    {number}
                </Pagination.Item>,
            );
        }

        if (this.state.paginator.page < this.state.paginator.pages - Math.ceil(showNumber / 2)) {
            items.push(<Pagination.Ellipsis key="after" disabled />);
        }

        const paginator = (
            <div className="d-flex justify-content-center">
                <br />
                <Pagination>
                    <Pagination.Prev
                        disabled={this.state.paginator.page <= 1}
                        onClick={() => this.changePage(this.state.paginator.page - 1)}
                    />
                    <Pagination.Item
                        active={1 === this.state.paginator.page}
                        onClick={() => this.changePage(1)}
                    >{1}</Pagination.Item>
                    {items}
                    <Pagination.Item
                        active={this.state.paginator.pages === this.state.paginator.page}
                        onClick={() => this.changePage(this.state.paginator.pages)}
                    >{this.state.paginator.pages}</Pagination.Item>
                    <Pagination.Next
                        disabled={this.state.paginator.page >= this.state.paginator.pages}
                        onClick={() => this.changePage(this.state.paginator.page + 1)}
                    />
                </Pagination>
                <br />
            </div>
        );

        return (
            <Container style={{ marginTop: "6rem" }}>
                <Row>
                    {bookItems}
                </Row>
                {paginator}
            </Container>
        );
    }
}
