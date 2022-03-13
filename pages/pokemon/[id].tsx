import { useState } from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';

import { Layout } from '../../components/layouts';
import { pokeApi } from '../../api';
import { Pokemon } from '../../interfaces';
import { localFavorites } from '../../utils';

interface PokemonPageProps {
    pokemon: Pokemon;
}

const PokemonPage: NextPage<PokemonPageProps> = ({ pokemon }) => {
    const { id, name, sprites } = pokemon;
    const [isFavorite, setFavorite] = useState(localFavorites.isFavorite(id));

    const handleToggleFavorite = () => {
        localFavorites.toggleFavorite(id);
        setFavorite(!isFavorite);
    };

    return (
        <Layout title={`Pokemon App | ${name}`}>
            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card hoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image
                                src={sprites?.other?.dream_world.front_default || '/no-image.ong'}
                                alt={name}
                                width="100%"
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform="capitalize">
                                {name}
                            </Text>
                            <Button
                                color="gradient"
                                ghost={!isFavorite}
                                onClick={handleToggleFavorite}
                            >
                                {isFavorite ? 'En Favorito' : 'Guardar en favorito'}
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text h2>Sprites:</Text>
                            <Container display="flex" direction="row" justify="center" gap={0}>
                                <Image
                                    src={sprites.front_default}
                                    alt={name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={sprites.back_default}
                                    alt={name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={sprites.front_shiny}
                                    alt={name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={sprites.back_shiny}
                                    alt={name}
                                    width={100}
                                    height={100}
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const ids = [...Array(151)].map((_, ix) => `${ix + 1}`);
    const paths = ids.map((id) => ({ params: { id } }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as { id: string };
    const { data: pokemon } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

    return {
        props: {
            pokemon,
        },
    };
};

export default PokemonPage;