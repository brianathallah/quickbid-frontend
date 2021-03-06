import { Layout, Col, Row, Form, Input, Button, DatePicker } from "antd";
import moment from "moment";
import "antd/dist/antd.css";
import React, { useEffect, useState, useCallback } from "react";
import { userMock } from "../../utils/const";
import { fetcher } from "../../utils/fetcher";
import { postUploadProduct } from "./fetcher";
import HeaderQuickBid from "../../components/Header";

const { Content, Footer } = Layout;

const parseStateToRequest = (state, userId) => {
  const { name, initialPrice, bidIncrement, imageUrl, startTime, endTime } =
    state;

  const request = {
    seller_id: userId,
    name,
    initial_price: initialPrice,
    bid_increment: bidIncrement,
    image_url: imageUrl,
    start_time: moment(startTime).unix(),
    end_time: moment(endTime).unix(),
  };

  return request;
};

function AddProductPage({ history }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(userMock);
  }, []);

  const navigateBack = useCallback(() => {
    history.push("/product/list");
  }, [history]);

  const handleFinishForm = useCallback(
    async (val) => {
      const data = {
        ...parseStateToRequest(val, user.user_id),
      };

      await postUploadProduct({ fetcher, data }).then((result) => {
        if (result.STATUS === "ERROR") return "Error";
        return navigateBack();
      });
    },
    [navigateBack, user]
  );

  return (
    <Layout className="layout">
      <HeaderQuickBid user={user} />
      <Content style={{ margin: "50px 100px" }}>
        <Row gutter={[24, 24]}>
          <Col span={8}>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={handleFinishForm}
              autoComplete="off"
            >
              <Form.Item
                label="Product Name"
                name="name"
                rules={[
                  { required: true, message: "Please input product name!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Initial Price"
                name="initialPrice"
                rules={[
                  { required: true, message: "Please input initial price" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Bid Increment"
                name="bidIncrement"
                rules={[
                  { required: true, message: "Please input bid increment!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Image URL"
                name="imageUrl"
                rules={[{ required: true, message: "Please input image URL!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Start Time"
                name="startTime"
                rules={[
                  { required: true, message: "Please input start time!" },
                ]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                label="End Time"
                name="endTime"
                rules={[{ required: true, message: "Please input end time!" }]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        QuickBid ??2022 Created by{" "}
      </Footer>
    </Layout>
  );
}

export default AddProductPage;
