import { Link } from 'gatsby'
import React from 'react'
import Toggler from './toggler'

export default function Header({menuLinks}) {
    return (
        <header itemScope itemType="http://schema.org/Menu">
            <Menu links={menuLinks} />
        </header>
    )
}

function Menu({ links }) {
    return (
        <nav style={{ display: `flex` }}>
            <ul
                style={{
                    display: `flex`,
                    flex: `1`,
                    margin: `0`,
                    listStyleType: `none`
                }}
            >
                {
                    links.map(
                        link => (
                            <li
                                style={{
                                    margin: `0 0.5rem 0 0`
                                }}
                                key={link.name}
                            >
                                <Button url={link.link} name={link.name}/>
                            </li>
                        )
                    )
                }
            </ul>
            <Toggler />
        </nav>
    )
}

function Button({ url, name }) {
    return (
        <Link
            to = {url}
            itemProp = "url"
            className="headerLink"
            getProps = {
                ({ isCurrent, isPartiallyCurrent }) => ({
                    style: 
                        (name === 'Home' ? isCurrent : isPartiallyCurrent)
                        ? {} : { textDecoration: `none`, color: `gray` }
                    }
                )
            }
        >
            {name}
        </Link>
    )
}