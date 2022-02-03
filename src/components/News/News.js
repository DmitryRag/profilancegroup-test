import { news } from '../../constants/news'
import './News.css'

export default function News({filteredDashboard}) {

    return (
        <div className='news__wrapper'>
            <h1 className='news__title'>Hot News</h1>
            <div className='news'>
            {filteredDashboard.map(news => (
                <dev className='news__card'>
                    <h2 className='news__name'>{news.title}</h2>
                    <p className='news__content'>{news.content}</p>
                    <p className='news__date'>{news.date}</p>
                </dev>
            ))}
            </div>
        </div>
    )
}