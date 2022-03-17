/* eslint-disable no-unused-vars */
import {
  Layout,
  Col,
  Row,
  Form,
  Input,
  Button,
  DatePicker,
  PageHeader,
} from "antd";
import moment from "moment";
import "antd/dist/antd.css";
import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { productMock, userMock } from "../../utils/const";
import { fetcher } from "../../utils/fetcher";
import { postEditProduct, getProductDetail } from "./fetcher";
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

function EditProductPage({ history }) {
  const [user, setUser] = useState({});
  const [product, setProduct] = useState({});
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setUser(userMock);
    setProduct(productMock);
    // const productId = searchParams.get("product_id");
    // const params = { product_id: productId };
    // getProductDetail({ fetcher, params }).then((res) => {
    //   if (res && res.data && res.data.length > 0) {
    //     const productData = res.data;
    //     setProduct(productData);
    //   }
    // });
  }, []);

  const navigateBack = useCallback(() => {
    history.push("/product/list");
  }, [history]);

  const handleFinishForm = useCallback(
    async (val) => {
      const data = {
        ...parseStateToRequest(val, user.user_id),
      };

      await postEditProduct({ fetcher, data }).then((result) => {
        if (result.STATUS === "ERROR") return "Error";
        return navigateBack();
      });
    },
    [navigateBack, user]
  );

  return (
    <Layout className="layout">
      <HeaderQuickBid user={user} />
      <PageHeader
        title={product.name}
        subTitle={product.seller_name}
        style={{ margin: "0px 100px" }}
      />
      <Content style={{ margin: "0px 100px" }}>
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
                initialValue={product.name}
                label="Product Name"
                name="name"
                rules={[
                  { required: true, message: "Please input product name!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                initialValue={product.initial_price}
                label="Initial Price"
                name="initialPrice"
                rules={[
                  { required: true, message: "Please input initial price" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                initialValue={product.bid_increment}
                label="Bid Increment"
                name="bidIncrement"
                rules={[
                  { required: true, message: "Please input bid increment!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                initialValue={product.image_url}
                label="Image URL"
                name="imageUrl"
                rules={[{ required: true, message: "Please input image URL!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                initialValue={moment(product.start_time)}
                label="Start Time"
                name="startTime"
                rules={[
                  { required: true, message: "Please input start time!" },
                ]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                initialValue={moment(product.end_time)}
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
        QuickBid ©2022 Created by{" "}
      </Footer>
    </Layout>
  );
}

export default EditProductPage;
