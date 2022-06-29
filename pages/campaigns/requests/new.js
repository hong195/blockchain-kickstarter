import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Router, Link } from "../../../routes";

class RequestNew extends Component {
    static async getInitialProps(props) {
        const {address} = props.query
        return {address: address}
    }

    state = {
        value: "",
        loading: false,
        errorMessage: "",
        description: "",
        recipient: "",
    }

    onSubmit = async (event) => {
        event.preventDefault()

        const campaign = Campaign(this.props.address)
        const { description, value, recipient } = this.state

        this.setState({loading: true, errorMessage: ""})

        try {
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient).send({
                from: accounts[0]
            })
            Router.replaceRoute(`/campaigns/${this.props.address}/requests`)
        }catch (err) {
            this.setState({errorMessage: err.message, loading: false})
        }
    }
    render() {
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>
                        <Button primary >Back</Button>
                    </a>
                </Link>

                <h3>Create Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Amount</label>
                        <Input
                            label="ether"
                            labelPosition="right"
                            value={this.state.value}
                            onChange={(event) => this.setState({value: event.target.value})}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={(event) => this.setState({description: event.target.value})}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            value={this.state.recipient}
                            onChange={(event) => this.setState({recipient: event.target.value})}
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage}></Message>
                    <Button primary loading={this.state.loading}>Create Request</Button>
                </Form>
            </Layout>
        )
    }
}

export default RequestNew;