<strong>Instructions to follow: </strong>
<ul>
  <li>
     <em>For charts: </em>
     <ol>
       <li>Install ng2-google-charts with: <strong>npm install --save ng2-google-charts</strong></li>
       <li>In app.module.ts make these changes: 
         <strong>
           <ul>
             <li>import { Ng2GoogleChartsModule } from 'ng2-google-charts';</li>
             <li>imports: [ ... Ng2GoogleChartsModule, ... ]</li>
           </ul>
         </strong>
       </li>
     </ol>
  </li>
  <li>
    <em>For carousel: </em>
    <ol>
      <li>Install Ngu-carousel using: <strong>npm install @ngu/carousel --save</strong></li>
      <li>Install hammerjs using: <strong>npm install hammerjs --save</strong></li>
      <li>Include CarouselModule in your app module:
          <h6>import { NguCarouselModule } from '@ngu/carousel';</h6>
          ...<br>
          <h6>@NgModule({ imports: [... NguCarouselModule ... })</h6>
      </li>
      <li>Import hammerjs in polyfills.ts file
        <strong>import 'hammerjs';</strong>
      </li>
      <li>That's it! The imports required in the component are already included in the files I have uploaded</li>
    </ol>
  </li>
</ul>
