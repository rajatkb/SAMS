<strong>Instructions to follow: </strong>
<ul>
  <li>Install bootstrap and add it to the angular-cli.json. </li>
  <li>Install font-awesome and add it to the angular-cli.json. </li>
  <li>
     <em>For charts: </em>
     <ol type="a">
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
</ul>
