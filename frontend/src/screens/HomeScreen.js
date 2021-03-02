import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Container } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import HeroCarousel from '../components/HeroCarousel'
import MapContainer from '../components/MapContainer'
import { LinkContainer } from 'react-router-bootstrap'
import CategoryShowcase from '../components/CategoryShowcase'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {!keyword ? (
        <>
          <HeroCarousel />
          <Container>
            <Row className=" mt-5">
              <Col sm={6} md={6} lg={3}>
                <CategoryShowcase categoryTitle="Chiens" categoryDescription="Aliments, Accessoires &amp; Jouets" 
                imgURL={process.env.PUBLIC_URL + '/images/dog2.png'}></CategoryShowcase>
              </Col>
              <Col sm={6} md={6} lg={3}>
                <CategoryShowcase categoryTitle="Chats" categoryDescription="Promotions jusqu'a x% sur les Aliments"
                imgURL={process.env.PUBLIC_URL + '/images/cat2.png'}></CategoryShowcase>
              </Col>
              <Col sm={6} md={6} lg={3}>
                <CategoryShowcase categoryTitle="Oiseaux" categoryDescription="Offres speciales sur Aliments &amp; Accesoires"
                imgURL={process.env.PUBLIC_URL + '/images/bird2.png'}></CategoryShowcase>
              </Col>
              <Col sm={6} md={6} lg={3}>
                <CategoryShowcase categoryTitle="Aquarium" categoryDescription="Offres &amp; Promos sur les produits Aqua"
                imgURL={process.env.PUBLIC_URL + '/images/fish2.png'}></CategoryShowcase>
              </Col>
            </Row>
          </Container>
      </>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <Container>
      
        <h1 className="section_title title mt-3">Nouvelles Arrivées</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row>
              {products.slice(0, 4).map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </>
        )}
      <h1 className='title'>Ou nous trouver?</h1>
      <div className="map mb-5 mt-5">
        <MapContainer></MapContainer>
      </div>
      </Container>
    </>
  ) 
}

export default HomeScreen
